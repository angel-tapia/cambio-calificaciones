import * as React from 'react';
import fcfmLogo from '../../assets/images/fcfm.png';
import uanlLogo from '../../assets/images/uanl.png';

const Header: React.FC = () => {
  return (
    <header>
      <img src={fcfmLogo} className="imagefcfm" alt="FCFM Logo" />
      <img src={uanlLogo} className="imageuanl" alt="UANL Logo" />
    </header>
  );
};

export default Header;
