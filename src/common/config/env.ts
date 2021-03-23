import "dotenv/config";

export interface ProcessEnv {
    [key: string]: string | undefined;
}

/**
 * node EnvConfig variables,
 * copy .env.example file, rename to .env
 *
 * @export
 * @class EnvConfig
 */
// tslint:disable-next-line: cyclomatic-complexity
export class EnvConfig {

    // NODE
    public static NODE_ENV = process.env["NODE_ENV"] || "LOCAL";
    public static PORT = process.env["PORT"] || 3000;

    //JWT
    public static JWT_SECRET = process.env["JWT_SECRET"] || "";

    //MONGODB
    public static MONGO_DB_URI = process.env["MONGO_DB_URI"] || "";
    public static MONGO_DB_NAME = process.env["MONGO_DB_NAME"] || "";

}