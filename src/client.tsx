import { create} from "apisauce";
 const apiClient= create({
 baseURL: 'http://localhost:8081',
 headers: { Accept: 'application/vnd.github.v3+json' },
 })
 export default apiClient