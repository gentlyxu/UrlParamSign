// Extensions are implemented as JavaScript classes
var UrlParamSign = function() {
  // implement the evaluate() method to generate the dynamic value
  this.evaluate = function(ctx) {
  	const signKey = ctx.getEnvironmentVariableByName("signKey").getCurrentValue();
  	const request = ctx.getCurrentRequest();
  	let qs = request.urlQuery.split("&");
  	if(!Array.isArray(qs)){
  		return null;
  	}

  	const usefulQuery = [];
  	for(let p of qs){
  		if(p[0] === '_'){
  			continue;
  		}
  		usefulQuery.push(p);
  	}

  	let input = `${signKey}${usefulQuery.sort().join("&")}${signKey}`;
    input = input.replace(/:/g, "%3A");
    input = input.replace(/\?/g, "%3F");
  	console.log(input);

    const dynamicValue = DynamicValue('com.luckymarmot.HashDynamicValue', {
        'input': input,
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
registerDynamicValueClass(UrlParamSign)