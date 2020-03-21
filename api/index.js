import catalog from './repositories/catalog';
import review from './repositories/review';
import info from './repositories/info';
import order from './repositories/order';

const repositories = {
  catalog: catalog,
  review: review,
  info: info,
  order: order
};

export const apiFactory = {
  get: name => repositories[name]
};
