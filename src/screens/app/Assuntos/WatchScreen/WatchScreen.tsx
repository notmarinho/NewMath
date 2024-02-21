import React, {useState, useCallback, useRef, FC} from 'react';
import {
  Alert,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
} from 'react-native';
import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';
import {Background, HeaderScreen} from '../../../../components';

interface Props {
  route: any;
}

const WatchScreen: FC<Props> = ({route}) => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const playerRef = useRef<YoutubeIframeRef>(null);
  const {item} = route.params;

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
    if (state === 'playing' || state === 'paused') {
      setLoading(false); // Desativa o carregamento quando o vídeo começa a tocar ou está pausado
    }
  }, []);

  return (
    <Background>
      <HeaderScreen title="Aulas" hasBackButton />
      {loading && (
        <ActivityIndicator size="large" color="#3D504C" /> // Indicador de carregamento
      )}
      <YoutubePlayer
        ref={playerRef}
        height={250}
        play={playing}
        playList={item.video_id}
        onChangeState={onStateChange}
        onReady={() => setLoading(false)} // Desativa o carregamento quando o vídeo está pronto para ser reproduzido
      />
      <ScrollView style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </ScrollView>
    </Background>
  );
};

export default WatchScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#3D504C',
  },
  description: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3D504C',
    textAlign: 'justify',
  },
  // Estilos adicionais se necessário
});
