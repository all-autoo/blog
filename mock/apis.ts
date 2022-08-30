import login from "./api/login"
import user from "./api/user"

export interface config {
  body: any;
  method: string;
  query: any;
}

export default [...login, ...user]
