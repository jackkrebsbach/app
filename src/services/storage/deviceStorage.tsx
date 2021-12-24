import AsyncStorage from '@react-native-async-storage/async-storage';

export let userData = {}

const deviceStorage = {
    // our AsyncStorage functions will go here :)
    async saveItem(key, value) {
        try {
          console.log("saving user:", value);
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },

      async loadJWT() {
        try {
            let data = await AsyncStorage.getItem("user_auth");
            userData = JSON.parse(data);
          } catch (error) {
            console.log("Something went wrong", error);
          }
         
      },

      async deleteJWT() {
        try{
          await AsyncStorage.removeItem('id_token')
          .then(
            () => {
              this.setState({
                jwt: ''
              })
            }
          );
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      }
      
};

export default deviceStorage;