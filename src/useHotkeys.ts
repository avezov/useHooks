import { useEffect } from 'react';

type HotkeyCallback = (event?: KeyboardEvent) => void;

type HotkeyParams = {
  metaKey?: boolean
  key: string
  callback: HotkeyCallback
}

export function useHotkeys(hotkeys: HotkeyParams[], elem?: HTMLElement) {
  useEffect(() => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      hotkeys.forEach(hotkey => {
        if (
          (hotkey.metaKey ? (event.metaKey || event.ctrlKey) : true)
          && event.key.toLowerCase() === hotkey.key.toLowerCase()
        ) {
          hotkey.callback(event as any);
        }
      });
    };

    (elem ?? window).addEventListener('keydown', handleKeyDown as any);

    return () => {
      (elem ?? window).removeEventListener('keydown', handleKeyDown as any);
    };
  }, [hotkeys, elem]);
};
