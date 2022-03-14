export function stringToColor(name:string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < name.length; i += 1) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  export function stringAvatar(name:string) {
      const splited = name.split(' ');      
      const text = `${splited[0][0]}${splited.length>1 ? splited[1][0] : ''}`;
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: text.toUpperCase()
    };
  }