import {
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { MimeTypes } from '../../../../app.model';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css',
})
export class FileInputComponent {
  @Input() controlName!: string;
  @Input() displayName!: string;
  @Input() accept: MimeTypes = MimeTypes.IMAGE_JPEG;

  @Output() imageChanged = new EventEmitter<
    string | ArrayBuffer | null | undefined
  >();

  #imageUrl: WritableSignal<string | ArrayBuffer | null | undefined> =
    signal(undefined);

  constructor() {
    effect(() => {
      const imageUrl = this.#imageUrl();
      if (imageUrl) {
        this.imageChanged.emit(imageUrl);
      }
    });
  }

  readUrl(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.#imageUrl.set((<FileReader>event.target).result);
      };

      reader.readAsDataURL(target.files[0]);
    }
  }
}
