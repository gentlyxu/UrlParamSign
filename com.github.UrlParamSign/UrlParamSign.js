// Extensions are implemented as JavaScript classes
const UrlParamSign = function() {
  // implement the evaluate() method to generate the dynamic value
  this.evaluate = function(ctx) {
    const signKey = ctx.getEnvironmentVariableByName("signKey").getCurrentValue();
    const req = ctx.getCurrentRequest();
    const queryString = req.getUrlParametersNames().filter(function(k) { return k[0] !== "_" }).sort().map(function(k) {
        let qs1 = req.getUrlParameterByName(k);
        qs1 = qs1.replace(/([^\*\'.~!a-z0-9])/g, function($1){return "%" + $1.charCodeAt(0).toString(16).toUpperCase()});
        return `${k}=${qs1}`;
      }).join("&");

      console.log(queryString);

      const dynamicValue = DynamicValue('com.luckymarmot.HashDynamicValue', {
        'input': `${signKey}${queryString}${signKey}`,
        'hashType': 5
      });
      return dynamicValue.getEvaluatedString();
    }
  }
  // set the Extension Identifier (must be same as the directory name)
  UrlParamSign.identifier = "com.github.UrlParamSign";
  // give a display name to your Dynamic Value
  UrlParamSign.title = "UrlParamSign";
  // link to the Dynamic Value documentation
  UrlParamSign.help = "https://github.com/gentlyxu/UrlParamSign";
  // call to register function is required
  registerDynamicValueClass(UrlParamSign);
