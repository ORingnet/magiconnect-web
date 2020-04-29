export const selectObj = {
  connectType: [
    { value: 'Dynamic/Static IP', disabled: false },
    { value: 'PPPoE', disabled: false },
    { value: 'Modem 3G/4G', disabled: false },
    { value: 'Wireless Client', disabled: false }
  ],
  connectMode: [{ value: 'TAP', disabled: false }, { value: 'TUN', disabled: true }]
};
