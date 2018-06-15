import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const storage = new Storage({
	size: 10000,
	storageBackend: AsyncStorage,
	defaultExpires: null
});

export default storage;