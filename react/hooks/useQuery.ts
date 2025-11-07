import { useLocation } from "react-router-dom";

/**
 * Source: https://reactrouter.com/web/example/query-parameters
 *
 * Usage Example:
 *
 * Given URL: http://localhost:3000/?name=Hulk
 *
 * const query = useQuery();
 * const name = query.get("name");
 * console.log(name) // Hulk
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default useQuery;
