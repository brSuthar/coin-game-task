import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {saveGame} from '../../store/history.slice';
import {useDispatch} from 'react-redux';

const TOTAL_COINS = 21;

enum Turn {
  mine = 'mine',
  ai = 'ai',
}

const PlayBoard = ({navigation}: any) => {
  const [coins, setCoins] = useState(TOTAL_COINS);
  const [turn, setTurn] = useState(Turn.mine);
  const dispatch: any = useDispatch();
  const lst_coin = [1, 2, 3, 4];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCoins(TOTAL_COINS);
      setTurn(Turn.mine);
    });

    return unsubscribe;
  }, []);

  const winCall = () => {
    dispatch(saveGame({name: new Date(), status: 'lose'}));
    navigation.navigate('Status', {title: 'You lose the game'});
  };

  function getRandomValue(pendingCoin: any) {
    const randomDecimal = Math.random();
    const randomValue = Math.floor(randomDecimal * pendingCoin) + 1;
    return randomValue;
  }

  const roundForAI = (remain: any) => {
    //find best case if it exist;
    for (let steps = 1; steps <= 4; steps++) {
      if (remain - steps === 1) {
        setCoins(pre => pre - steps);
        winCall();
        setTurn(Turn.mine);
        return;
      }
    }

    let ai_Option: any = {
      1: true,
      2: true,
      3: true,
      4: true,
    };

    let ai_probability: any = {};

    for (let i = 1; i <= 4; i++) {
      const value = remain - i;
      if (value >= 1) {
        ai_probability[value] = i;
      } else {
        ai_Option[i] = false;
      }
    }

    // console.log('AiPrabability:: ', ai_probability);

    for (let val of Object.keys(ai_probability)) {
      console.log('Probability:: ', val);
      for (let steps = 1; steps <= 4; steps++) {
        if (val - steps === 1) {
          ai_Option[ai_probability[val]] = false;
          break;
        }
      }
    }

    console.log('AiOption:: ', ai_Option);

    const ai_coins = Object.keys(ai_Option).filter(
      (key: any) => ai_Option[key] === true,
    );
    let ai_choosed_coin: any = 1;
    if (ai_coins.length > 0) {
      const ai_coin_index = Math.floor(Math.random() * ai_coins.length);
      ai_choosed_coin = ai_coins[ai_coin_index];
    } else {
      ai_choosed_coin = getRandomValue(remain > 4 ? 4 : remain);
    }
    console.log('AI SelectedValue:: ', ai_choosed_coin);
    setCoins(pre => pre - ai_choosed_coin);
    setTurn(Turn.mine);
  };

  const onChooseCoin = (choosed: any) => () => {
    const remain = coins - choosed;
    if (remain === 1) {
      dispatch(saveGame({name: new Date(), status: 'win'}));
      navigation.push('Status', {title: 'You win the game'});
    } else if (remain < 1) {
      winCall();
    } else {
      setCoins(remain);
      setTurn(Turn.ai);
      setTimeout(() => roundForAI(remain), 1000);
    }
  };

  const renderCoins = (val: any) => {
    if (val <= coins) {
      return (
        <TouchableOpacity
          onPress={onChooseCoin(val)}
          style={{
            height: 40,
            width: 30,
            backgroundColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>{val}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 16, backgroundColor: 'white'}}>
      {turn === Turn.ai && (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{textAlign: 'center', marginTop: 12, marginBottom: 4}}>
            Wait AI is playing game
          </Text>
          <ActivityIndicator animating={true} size={'large'} color={'blue'} />
        </View>
      )}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Remaining Coin</Text>
        <Text>{coins}</Text>
      </View>
      {turn === Turn.mine && (
        <View style={{width: '100%'}}>
          <Text style={{textAlign: 'center', marginBottom: 10}}>
            Please pick one coin
          </Text>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 120,
            }}>
            {lst_coin.map(renderCoins)}
          </View>
        </View>
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.push('History');
        }}
        style={{
          width: '100%',
          height: 48,
          backgroundColor: '#C5C7C8',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Visit history</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayBoard;
