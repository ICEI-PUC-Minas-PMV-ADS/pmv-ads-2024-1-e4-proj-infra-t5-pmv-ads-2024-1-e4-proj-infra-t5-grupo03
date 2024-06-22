import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com'); 
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com'); 
  };

  const handleTwitterPress = () => {
    Linking.openURL('https://www.twitter.com'); 
  };

  const handleGithubPress = () => {
    Linking.openURL('https://www.github.com'); 
  };

  const handleYoutubePress = () => {
    Linking.openURL('https://www.youtube.com'); 
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2024 Boxgames</Text>
      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={handleFacebookPress}>
          <Icon name="facebook" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInstagramPress}>
          <Icon name="instagram" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTwitterPress}>
          <Icon name="twitter" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGithubPress}>
          <Icon name="github" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleYoutubePress}>
          <Icon name="youtube" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  text: {
    color: 'orange',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
});

export default Footer;


