import { PUBLIC_USER, PUBLIC_CONNECTIONSTRING, PUBLIC_PASSWORD } from '$env/static/public';
import map from './map';

const db = map.oracle({
	user: PUBLIC_USER,
	password: PUBLIC_PASSWORD,
	connectString: PUBLIC_CONNECTIONSTRING
});

export default db;
