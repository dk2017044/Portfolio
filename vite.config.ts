import { defineConfig, loadEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react";

function localChatApiPlugin(groqKey: string, groqModel?: string): Plugin {
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

            const model = groqModel || process.env.GROQ_MODEL || "qwen/qwen3.8-27b";
            const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model,
                messages,
                temperature: 0.7,
                max_tokens: 350,
              }),
            });

            const data = await groqRes.json();
            if (data?.choices && data.choices[0]?.message) {
              const msg = data.choices[0].message;
              if (!msg.content && msg.reasoning) {
                msg.content = msg.reasoning;
              }
            }
            res.setHeader("Content-Type", "application/json");
            res.statusCode = groqRes.status;
            res.end(JSON.stringify(data));
          } catch (err: unknown) {
            res.statusCode = 500;
            const message = err instanceof Error ? err.message : "Unknown error";
            res.end(JSON.stringify({ error: message }));
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
  const groqModel = env.GROQ_MODEL || process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

  return {
    plugins: [react(), localChatApiPlugin(groqKey, groqModel)],
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
