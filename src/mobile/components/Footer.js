import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com'); // URL do Facebook aqui
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com'); // URL do Instagram aqui
  };

  const handleTwitterPress = () => {
    Linking.openURL('https://www.twitter.com'); // URL do Twitter aqui
  };

  const handleGithubPress = () => {
    Linking.openURL('https://www.github.com'); // URL do GitHub aqui
  };

  const handleYoutubePress = () => {
    Linking.openURL('https://www.youtube.com'); // URL do YouTube aqui
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
    color: 'gray',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
});

export default Footer;


