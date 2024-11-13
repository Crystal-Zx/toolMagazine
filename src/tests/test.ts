function handleRequest(url: string,  param: 0 | 1): void {
  console.log(`${url}, param: ${param}`)
};

const req = { url: "https://example.com",  param: 1 } as const;
handleRequest(req.url,  req.param);

// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
