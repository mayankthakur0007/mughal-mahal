import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';

class Card extends React.Component {
  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { product: item })}>
          <Block flex style={imgContainer}>
            <Image resizeMode="cover" source={{uri: item.image}} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Product', { product: item })}>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={{ fontFamily: 'montserrat-regular' }}
                size={14}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.title}
              </Text>
              {item.subtitle ? (
                <Block flex center>
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={32}
                    color={nowTheme.COLORS.BLACK}
                  >
                    {item.subtitle}
                  </Text>
                </Block>
              ) : null}
              {item.description ? (
                <Block flex center>
                  <Text
                    style={{ fontFamily: 'montserrat-regular', textAlign: 'center', padding: 15 }}
                    size={14}
                    color={"#9A9A9A"}
                  >
                    {item.description}
                  </Text>
                </Block>
              ) : null}
              {item.body ? (
                <Block flex left>
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={12}
                    color={nowTheme.COLORS.TEXT}
                  >
                    {item.body}
                  </Text>
                </Block>
              ) : null}
              {item.price ? (
                <Block flex left>
                  <Text
                    style={styles.itemPrice}
                  >
                    {item.price}
                  </Text>
                </Block>
              ) : null}
            </Block>
            {item.cta ? (
              <Block right={ctaRight ? true : false}>
                <Text
                  style={styles.articleButton}
                  size={12}
                  muted={!ctaColor}
                  color={ctaColor || nowTheme.COLORS.ACTIVE}
                  bold
                >
                  {item.cta}
                </Text>
              </Block>
            ) : null}
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any
};

const styles = StyleSheet.create({
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 0,
    marginBottom: 4,
    marginVertical: theme.SIZES.BASE,
    minHeight: 114
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  cardTitle: {
    paddingBottom: 15,
    paddingHorizontal: 9,
    paddingTop: 7
  },
  fullImage: {
    height: 215
  },
  horizontalImage: {
    height: 122,
    width: 'auto'
  },
  horizontalStyles: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  },
//   image: {
//     // borderRadius: 3,
//   },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden'
  },
  itemPrice: {
    color: nowTheme.COLORS.PRIMARY,
    fontFamily: 'montserrat-regular',
    fontSize: 12,
    paddingHorizontal: 9
  },
  shadow: {
    elevation: 2,
    shadowColor: '#8898AA',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  verticalStyles: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
});

export default withNavigation(Card);
