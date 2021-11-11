import blessed from 'blessed';

function makeMenuBox(parent) {
  return blessed.list({
    parent,
    label: ' Menu ',

    top: `${0}%`,
    left: `${0}%`,
    width: `${30}%`,
    height: `${80}%`,
    padding: 0,

    scrollable: true,
    scrollbar: {
      ch: '=',
      inverse: false,
    },
    keys: true,
    tags: true, // {bold}{/bold}
    autoCommandKeys: true, // 0-9 for switching options
    border: {
      type: 'line',
    },
    style: {
      fg: 'white',
      border: {
        fg: 'blue',
      },
      scrollbar: {
        bg: 'blue',
        fg: 'black',
      },
    },
  });
}
export { makeMenuBox };

// focus: {
// 	bg: "blue",
// 	fg: "white",
// },
