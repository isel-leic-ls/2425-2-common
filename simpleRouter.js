const routes = []
let notFoundRouteHandler = () => { throw "Route handler for unknown routes not defined" }

function addRouteHandler(pathTemplate, handler){
    routes.push({pathTemplate: pathTemplate.split('/'), handler})
}
function addDefaultNotFoundRouteHandler(notFoundRH) {
    notFoundRouteHandler = notFoundRH
}

function getRouteHandler(path){

    path = path.split('/')
    const params = {}
    const route = routes.find(currentHandlerMatchesUri) || { handler : notFoundHandler}
    return {params , handler : route.handler}

    function currentHandlerMatchesUri(uriHandler) {
          params = { }
          return uriHandler.pathTemplate.length == path.length && uriHandler.pathTemplate.every(segmentMatches)

          function segmentMatches(segment, idx) {
            const param = segment.startsWith(':') && segment.substring(1)
            if(param) {
              params[param] = path[idx]
            }
            return segment == path[idx] || param
          }
        }
}

const router = {
    addRouteHandler,
    getRouteHandler,
    addDefaultNotFoundRouteHandler
}

export default router