import path from "path"
import fs from "fs"
import marked from "marked"

const mdToJs = (str) => {
  const content = JSON.stringify(marked(str))
  return `export default ${content}`
};

const md = () => ({
    // configureServer: [ // 用于开发
    //   async ({ app }) => {
    //     app.use(async (ctx, next) => {
    //       // koa
    //       if (ctx.path.endsWith(".md")) {
    //         ctx.type = "js"
    //         const filePath = path.join(process.cwd(), ctx.path)
    //         ctx.body = mdToJs(fs.readFileSync(filePath).toString())
    //       } else {
    //         await next()
    //       }
    //     })
    //   },
    // ],
    configureServer(server) {

        console.log(server.middlewares)
        return () => {
            server.app.use(async (req, res, next) => {
                // koa
                console.log(req)
                console.log(res)
                if (res.path.endsWith(".md")) {
                  res.type = "js"
                  const filePath = path.join(process.cwd(), res.path)
                  res.body = mdToJs(fs.readFileSync(filePath).toString())
                } else {
                  await next()
                }
              })
        }
    },
    transforms: [
        {
          // 用于 rollup // 插件
          test: (context) => context.path.endsWith(".md"),
          transform: ({ code }) => mdToJs(code),
        },
      ],
  }
)

export default md