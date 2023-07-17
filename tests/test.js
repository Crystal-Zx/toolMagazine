function handleRequest(url, param) {
    console.log("".concat(url, ", param: ").concat(param));
}
;
var req = { url: "https://example.com", param: 1 };
handleRequest(req.url, req.param);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
