import { defineConfig, loadEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react";

function localChatApiPlugin(groqKey: string): Plugin {
  return {
    name: "local-chat-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req: any, res: any) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let body = "";
        req.on("data", (chunk: any) => {
          body += chunk;
        });

        req.on("end", async () => {
          try {
            const { messages } = JSON.parse(body || "{}");
            const apiKey = groqKey || process.env.GROQ_API_KEY;

            if (!apiKey) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Missing GROQ_API_KEY" }));
              return;
            }

            const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "qwen/qwen3.8-27b",
                messages,
                temperature: 0.7,
                max_tokens: 300,
              }),
            });

            const data = await groqRes.json();
            res.setHeader("Content-Type", "application/json");
            res.statusCode = groqRes.status;
            res.end(JSON.stringify(data));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const groqKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY || "";

  return {
    plugins: [react(), localChatApiPlugin(groqKey)],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            three: ["three", "three-stdlib"],
            "react-three": ["@react-three/fiber", "@react-three/drei"],
            gsap: ["gsap"],
            vendor: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      include: ["three", "gsap", "lenis"],
    },
  };
});
