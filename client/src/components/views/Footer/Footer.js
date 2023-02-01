import clsx from 'clsx';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
      <footer className={clsx('text-center', styles.footer)}>Copyright © Rubbertree 2023</footer>
  );
}

export default Footer;