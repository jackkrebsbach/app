import { Dimensions } from 'react-native'
import Video from 'react-native-video'
import styled from 'styled-components/native'
const { width, height } = Dimensions.get('window')

export const BackgroundVideo = styled(Video)`
    height: 200px;
    width: ${width}px;
    bottom: ${height / 2 - 100}px;
    align-items: stretch;
    position: absolute;
`
