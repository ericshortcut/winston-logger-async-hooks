const winston = require('winston');
const hooks = require('./hooks');

exports.createContext = ({serviceName='default-service-name'})=>(request, _, next) => {
    const { host } = request.headers;
    hooks.createRequestContext({ host, serviceName },request?.headers?.request_id);
    next();
  }

  const loggerConfig = logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
  //   defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
});

loggerConfig.add(new winston.transports.Console({format: winston.format.simple()}));

exports.logger = new Proxy(loggerConfig, {
    get(target, property, receiver) {
      target.defaultMeta = {...hooks.getRequestContext()};
      return Reflect.get(target, property, receiver);
    },

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
    
//   }));
});
