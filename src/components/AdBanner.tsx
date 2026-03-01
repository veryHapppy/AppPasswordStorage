import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import styled from 'styled-components/native';

const adUnitId = TestIds.BANNER;

const AdContainer = styled.View`
  width: 100%;
  min-height: 60px;
  justify-content: center;
  align-items: center;
`;

const AdBanner = () => {
    return (
        <AdContainer>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true
                }}
            />
        </AdContainer>
    );
};

export default AdBanner;