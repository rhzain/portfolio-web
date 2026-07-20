import { icons as deviconIcons } from "@iconify-json/devicon";
import { icons as logoIcons } from "@iconify-json/logos";
import {
  siDocker,
  siDotnet,
  siExpress,
  siFigma,
  siFlask,
  siGit,
  siGithub,
  siJavascript,
  siLangchain,
  siLaravel,
  siLinux,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siNotion,
  siOpenjdk,
  siOpencv,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siPytorch,
  siRedis,
  siScikitlearn,
  siStreamlit,
  siSwagger,
  siTailscale,
  siTensorflow,
  siTypescript,
  siUnity,
} from "simple-icons";
import type { CSSProperties } from "react";
import { Tooltip } from "@/components/motion/tooltip";
import { stack } from "@/content/portfolio";

const stackIcons = {
  docker: siDocker,
  dotnet: siDotnet,
  express: siExpress,
  figma: siFigma,
  flask: siFlask,
  git: siGit,
  github: siGithub,
  javascript: siJavascript,
  langchain: siLangchain,
  laravel: siLaravel,
  linux: siLinux,
  mongodb: siMongodb,
  mysql: siMysql,
  nextdotjs: siNextdotjs,
  nginx: siNginx,
  nodedotjs: siNodedotjs,
  notion: siNotion,
  openjdk: siOpenjdk,
  opencv: siOpencv,
  php: siPhp,
  postgresql: siPostgresql,
  postman: siPostman,
  python: siPython,
  pytorch: siPytorch,
  redis: siRedis,
  scikitlearn: siScikitlearn,
  streamlit: siStreamlit,
  swagger: siSwagger,
  tailscale: siTailscale,
  tensorflow: siTensorflow,
  typescript: siTypescript,
  unity: siUnity,
};

type IconCollection = {
  icons: Record<string, { body: string; width?: number; height?: number }>;
  width?: number;
  height?: number;
};

function getArtwork(collection: IconCollection, name: string) {
  const icon = collection.icons[name];

  return {
    body: icon.body,
    width: icon.width ?? collection.width ?? 24,
    height: icon.height ?? collection.height ?? 24,
  };
}

const stackArtwork: Partial<
  Record<keyof typeof stackIcons, ReturnType<typeof getArtwork>>
> = {
  docker: getArtwork(logoIcons, "docker-icon"),
  dotnet: getArtwork(logoIcons, "dotnet"),
  figma: getArtwork(logoIcons, "figma"),
  git: getArtwork(logoIcons, "git-icon"),
  javascript: getArtwork(logoIcons, "javascript"),
  laravel: getArtwork(logoIcons, "laravel"),
  linux: getArtwork(logoIcons, "linux-tux"),
  mongodb: getArtwork(logoIcons, "mongodb-icon"),
  mysql: getArtwork(logoIcons, "mysql-icon"),
  nginx: getArtwork(logoIcons, "nginx"),
  nodedotjs: getArtwork(logoIcons, "nodejs-icon"),
  opencv: getArtwork(logoIcons, "opencv"),
  openjdk: getArtwork(logoIcons, "java"),
  php: getArtwork(logoIcons, "php"),
  postgresql: getArtwork(logoIcons, "postgresql"),
  postman: getArtwork(logoIcons, "postman-icon"),
  python: getArtwork(logoIcons, "python"),
  pytorch: getArtwork(logoIcons, "pytorch-icon"),
  redis: getArtwork(logoIcons, "redis"),
  scikitlearn: getArtwork(deviconIcons, "scikitlearn"),
  streamlit: getArtwork(logoIcons, "streamlit"),
  swagger: getArtwork(logoIcons, "swagger"),
  tensorflow: getArtwork(logoIcons, "tensorflow"),
  typescript: getArtwork(logoIcons, "typescript-icon"),
};

export function StackSection() {
  return (
    <section id="stack" className="document-section stack" aria-labelledby="stack-title">
      <h2 id="stack-title">Technical stack</h2>
      <dl className="stack-list">
        {stack.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              <ul className="stack-tools">
                {item.tools.map((tool) => {
                  const icon = stackIcons[tool.icon];
                  const artwork = stackArtwork[tool.icon];

                  return (
                    <li key={tool.name}>
                      <Tooltip
                        content={tool.name}
                        delay={200}
                        side="top"
                        wrapperClassName="stack-tooltip-trigger"
                      >
                        <button
                          type="button"
                          className="stack-tool"
                          aria-label={tool.name}
                          style={
                            {
                              "--stack-brand":
                                icon.hex === "000000"
                                  ? "var(--color-ink)"
                                  : `#${icon.hex}`,
                            } as CSSProperties
                          }
                        >
                          {artwork ? (
                            <svg
                              aria-hidden="true"
                              className="stack-tool-artwork"
                              focusable="false"
                              viewBox={`0 0 ${artwork.width} ${artwork.height}`}
                              dangerouslySetInnerHTML={{ __html: artwork.body }}
                            />
                          ) : (
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              viewBox="0 0 24 24"
                            >
                              <path d={icon.path} />
                            </svg>
                          )}
                        </button>
                      </Tooltip>
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
