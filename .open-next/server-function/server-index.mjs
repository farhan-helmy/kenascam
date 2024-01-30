export const handler = async (event, context) => {

if (event.rawPath) {
  const routeData = [{"regex":"^/(?:/)?$","logGroupPath":"/8a5edab2/"},{"regex":"^/_not\\-found(?:/)?$","logGroupPath":"/788bf135/_not-found"},{"regex":"^/\\(\\.\\)scam/([^/]+?)(?:/)?$","logGroupPath":"/5a5a0b9e/.scam/id"},{"regex":"^/browse(?:/)?$","logGroupPath":"/94ff0d71/browse"},{"regex":"^/favicon\\.ico(?:/)?$","logGroupPath":"/b1803648/favicon.ico"},{"regex":"^/scam/([^/]+?)(?:/)?$","logGroupPath":"/0958ac31/scam/id"}].find(({ regex, prefix }) => {
    if (regex) return event.rawPath.match(new RegExp(regex));
    if (prefix) return event.rawPath === prefix || (event.rawPath === prefix + "/");
    return false;
  });
  if (routeData) {
    console.log("::sst::" + JSON.stringify({
      action:"log.split",
      properties: {
        logGroupName:"/sst/lambda/" + context.functionName + routeData.logGroupPath,
      },
    }));
  }
}
  const { handler: rawHandler} = await import("./index.mjs");
  return rawHandler(event, context);
};