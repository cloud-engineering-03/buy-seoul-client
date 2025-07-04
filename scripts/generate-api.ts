import { generate } from "openapi-typescript-codegen";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

// .env 파일 로드
dotenv.config();

// 환경 변수 타입 정의
interface Env {
  API_BASE_URL: string;
  API_DOCS_PATH: string;
  API_USER: string;
  API_PASSWORD: string;
}

// 환경 변수 검증
function validateEnv(): Env {
  const apiBaseUrl = process.env.API_BASE_URL;
  const apiDocsPath = process.env.API_DOCS_PATH;
  const apiUser = process.env.API_USER;
  const apiPassword = process.env.API_PASSWORD;

  if (!apiBaseUrl || !apiDocsPath || !apiUser || !apiPassword) {
    throw new Error(
      "필수 환경 변수가 설정되지 않았습니다. .env 파일을 확인해주세요. (API_BASE_URL, API_DOCS_PATH, API_USER, API_PASSWORD)"
    );
  }

  return {
    API_BASE_URL: apiBaseUrl,
    API_DOCS_PATH: apiDocsPath,
    API_USER: apiUser,
    API_PASSWORD: apiPassword,
  };
}

// OpenAPI.ts 파일 수정
function modifyOpenAPIConfig(apiBaseUrl: string) {
  const openAPIPath = path.join(process.cwd(), "api", "core", "OpenAPI.ts");
  const content = fs.readFileSync(openAPIPath, "utf-8");

  // BASE URL을 환경 변수로 대체
  const modifiedContent = content.replace(
    /BASE: '.*',/,
    `BASE: process.env.API_BASE_URL || '${apiBaseUrl}',`
  );

  fs.writeFileSync(openAPIPath, modifiedContent);
}

// ApiClient.ts 파일 수정
function modifyApiClient(apiBaseUrl: string) {
  const apiClientPath = path.join(process.cwd(), "api", "ApiClient.ts");
  const content = fs.readFileSync(apiClientPath, "utf-8");

  // BASE URL을 환경 변수로 대체
  const modifiedContent = content.replace(
    /BASE: config\?\.BASE \?\? '.*',/,
    `BASE: config?.BASE ?? process.env.API_BASE_URL ?? '${apiBaseUrl}',`
  );

  fs.writeFileSync(apiClientPath, modifiedContent);
}

async function generateApi() {
  try {
    await generate({
      input: "./openapi.json",
      output: "./api",
      clientName: "ApiClient",
      useOptions: true,
      useUnionTypes: true,
      exportCore: true,
      exportServices: true,
      exportModels: true,
      exportSchemas: true,
      httpClient: "axios",
      indent: "2",
    });

    // 생성된 파일 수정
    modifyOpenAPIConfig("http://localhost:8082");
    modifyApiClient("http://localhost:8082");

    console.log("API 생성이 완료되었습니다.");
  } catch (error) {
    console.error("API 생성 중 오류가 발생했습니다:", error);
  }
}

async function generateJSON() {
  try {
    const env = validateEnv();
    const apiUrl = `${env.API_BASE_URL}${env.API_DOCS_PATH}`;
    const auth = Buffer.from(`${env.API_USER}:${env.API_PASSWORD}`).toString(
      "base64"
    );

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `API 문서를 가져오는 데 실패했습니다: ${response.statusText}`
      );
    }
    const openApiJson = await response.json();
    const outputPath = path.join(process.cwd(), "openapi.json");
    fs.writeFileSync(outputPath, JSON.stringify(openApiJson, null, 2));

    console.log("JSON 생성이 완료되었습니다.");
  } catch (error) {
    console.error("JSON 생성 중 오류가 발생했습니다:", error);
  }
}

await generateJSON();
generateApi();
