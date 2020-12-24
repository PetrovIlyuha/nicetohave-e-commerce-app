import { motion } from 'framer-motion';
import styled from 'styled-components';

export const MainPageContainer = styled(motion.main)`
  width: 100%;
  margin: 0 auto;
  padding: 2rem 10rem;
  background: ${props => (props.darkMode ? '#432371' : '#F0F3F6')};
  text-align: center;
  h2 {
    color: ${props => (props.darkMode ? '#F0F3F6' : '#432371')};
  }
`;
