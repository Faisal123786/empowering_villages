export const employeeProgress = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  req.app.locals.sseClients = req.app.locals.sseClients || [];
  req.app.locals.sseClients.push(res);

  req.on("close", () => {
    req.app.locals.sseClients = req.app.locals.sseClients.filter(c => c !== res);
  });
};

export const sendSseEvent = (res, message, step, progress) => {
  res.write(`data: ${JSON.stringify({ message, step, progress })}\n\n`);
};
