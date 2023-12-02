import api from './api';

import { CONFIG } from './const/enums';
import { sequelizeConnection } from './db';
import { createDefaultTableRecords } from './db/utils';
import { getConfigValue, getServerUrl, isDev } from './config';

const bootstrap = async () => {
  const serverPort = getConfigValue(CONFIG.SERVER_PORT);

  await sequelizeConnection.sync({
    force: isDev()? true : false,
  });

  if (isDev()) {
    await createDefaultTableRecords();
  }

  try {
    api.listen(serverPort, () => {
      console.log(`Server is running at ${getServerUrl()}`)
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
