import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[numbersOnly]' })
export class NumbersOnlyDirective {
  // @Input() numbersOnly: boolean;

  private allowedKeys: string[] = allowedKeys;
  private specialKeys: string[] = specialKeys;
  private numberKeys: string[] = numberKeys;
  private DIGITS_REGEXP = new RegExp(/\D/g);

  constructor(private el: ElementRef) {
    // Sanatize clipboard by removing any non-numeric input after pasting
    this.el.nativeElement.onpaste = this.sanatizeClipboard;
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    const { key, ctrlKey, metaKey, shiftKey } = e;
    // Allow, don't do anything
    const checksOut: boolean =
      // Ctrl+A Ctrl+C Ctrl+V Ctrl+X
      (this.specialKeys.indexOf(key) !== -1 && (ctrlKey || metaKey)) ||
      this.allowedKeys.indexOf(key) !== -1;
    if (checksOut) return;

    // Ensure that it is a number and stop the keypress
    if (shiftKey || this.numberKeys.indexOf(key) === -1) e.preventDefault();
  }

  private sanatizeClipboard = (e: ClipboardEvent) => {
    e.preventDefault();
    let text;
    let clp = e.clipboardData;
    if (clp === undefined || clp === null) {
      text = (<any>window).clipboardData.getData('text') || '';
      if (text !== '') {
        text = text.replace(this.DIGITS_REGEXP, '');
        if (window.getSelection) {
          let newNode = document.createElement('span');
          newNode.innerHTML = text;
          window.getSelection()?.getRangeAt(0).insertNode(newNode);
        } else (<any>window).selection.createRange().pasteHTML(text);
      }
    } else {
      text = clp.getData('text/plain') || '';
      if (text !== '') {
        text = text.replace(this.DIGITS_REGEXP, '');
        document.execCommand('insertText', false, text);
      }
    }
  };
}

const allowedKeys: string[] = [
  'Delete',
  'Backspace',
  'Tab',
  'Escape',
  'Enter',
  'NumLock',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'End',
  'Home',
  '.',
];

const specialKeys: string[] = ['a', 'x', 'c', 'v'];

const numberKeys: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
