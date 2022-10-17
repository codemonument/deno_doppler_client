// deno-lint-ignore-file require-await
// import retrofit from "ts-retrofit";
import ky from "../deps/ky.ts";
import { encode as encodeBase64 } from "../deps/std_base64.ts";
import { Secret } from "../mod.ts";
import { Config } from "./types/Config.ts";
import { DopplerResponse } from "./types/DopplerResponse.ts";

export type DopplerServiceOptions = {
  token: string;
};

export const BASE_URL = "https://api.doppler.com/v3";

export class DopplerService {
  private http;

  constructor({ token }: DopplerServiceOptions) {
    this.http = ky.create({
      prefixUrl: BASE_URL,
      headers: {
        "Authorization": `Basic ${encodeBase64(`${token}:dummy_password`)}`,
      },
    });
  }

  // Deactivated, due to not usable with Service Token
  // async getProjects() {
  //   const req = this.http.get(`projects`);
  //   return req;
  // }

  // Deactivated, due to not usable with Service Token
  // async getEnvironments(project: string) {
  //   return this.http.get(`environments`, { searchParams: { project } });
  // }

  async getConfigs(
    project: string,
  ): Promise<DopplerResponse & { configs: Config[] }> {
    return this.http.get(`configs`, { searchParams: { project } }).json();
  }

  async getSecrets(
    project: string,
    config: string,
  ): Promise<DopplerResponse & { secrets: Record<string, Secret> }> {
    return this.http.get(`configs/config/secrets`, {
      searchParams: { project, config },
    }).json();
  }

  /**
   * Simply an alias for DopplerService.retrieveSecret
   */
  async getSecret(
    project: string,
    config: string,
    secret: string,
  ): Promise<DopplerResponse & { value: Secret }> {
    return this.retrieveSecret(project, config, secret);
  }

  async retrieveSecret(
    project: string,
    config: string,
    secret: string,
  ): Promise<DopplerResponse & { value: Secret }> {
    return this.http.get(`configs/config/secret`, {
      searchParams: { project, config, name: secret },
    }).json();
  }
}
