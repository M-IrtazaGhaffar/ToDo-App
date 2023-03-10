import { Box, Button, HStack } from '@chakra-ui/react';
import React, { memo, useState } from 'react';
import moment from 'moment';

function Moment() {
  var now = moment();
  const [R, setR] = useState(0);
  setInterval(() => {
    setR(R + 1);
  }, 60000);
  return (
    <HStack padding={0}>
      <Box
        border={'1px'}
        borderColor={'gray'}
        p={5}
        borderRadius={5}
        fontSize={'2xl'}
      >
        {now.hour() < 10
          ? '0' + now.hour() : now.hour() > 12
            ? now.hour() > 21 ? now.hour() - 12 : '0' + (now.hour() - 12)
            : now.hour()}
      </Box>
      <Box fontSize={'2xl'}>:</Box>
      <Box
        border={'1px'}
        borderColor={'gray'}
        p={5}
        borderRadius={5}
        fontSize={'2xl'}
      >
        {now.minutes() > 9 ? now.minutes() : '0' + now.minutes()}
      </Box>
      <Box fontSize={'2xl'}>-</Box>
      <Box
        border={'1px'}
        borderColor={'gray'}
        p={5}
        borderRadius={5}
        fontSize={'2xl'}
        textTransform={'uppercase'}
      >
        {now.format('a')}
      </Box>
    </HStack>
  );
}

export default memo(Moment);
