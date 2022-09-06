import winston from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';
import os from 'os';
import path from 'path';

const logger = winston.createLogger();
logger.exitOnError = false;

const awsConfig = {
  logGroupName: process.env.AWS_CLOUDWATCH_LOG_GROUP_NAME,
  logStreamName: process.env.AWS_CLOUDWATCH_LOG_STREAM_NAME,
  awsRegion: process.env.AWS_CLOUDWATCH_LOG_REGION,
  awsAccessKeyId: process.env.AWS_CLOUDWATCH_LOG_ACCESS_KEY,
  awsSecretKey: process.env.AWS_CLOUDWATCH_LOG_SECRET,
};

if (
  process.env.AWS_CLOUDWATCH_LOGS === 'yes' &&
  awsConfig.logGroupName &&
  awsConfig.logStreamName &&
  awsConfig.awsRegion &&
  awsConfig.awsAccessKeyId &&
  awsConfig.awsSecretKey
) {
  logger.add(new WinstonCloudwatch(awsConfig));
}

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

// caso não houver tranpsort configurado, por default irá salvar em arquivo
if (logger.transports.length === 0) {
  logger.add(
    new winston.transports.File({
      filename: `${os.tmpdir}${path.sep}_api_error.log`,
      level: 'error',
    }),
  );
  logger.add(
    new winston.transports.File({
      filename: `${os.tmpdir}${path.sep}_api_all.log`,
    }),
  );
}

export default logger;
