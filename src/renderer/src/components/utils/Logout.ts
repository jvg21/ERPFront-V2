import { StaticConfig } from "@renderer/app/config/config";

export function Logout(){
    localStorage.removeItem(StaticConfig.authTokenKeyString)
    localStorage.removeItem(StaticConfig.userDataKeyString)
    window.location.reload()
}