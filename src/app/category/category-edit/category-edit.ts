import { Component, OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../category.service/category.service';
import { Category } from '../model/category';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-category-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
    templateUrl: './category-edit.html',
    styleUrl: './category-edit.scss'
})
export class CategoryEditComponent implements OnInit {
    protected readonly dialogRef = inject(MatDialogRef<CategoryEditComponent>);
    protected readonly categoryService = inject(CategoryService);

    protected readonly id = signal<number | null>(null);
    protected readonly name = signal<string | null>(null);
    protected readonly data = inject(MAT_DIALOG_DATA);

    ngOnInit(): void {
        this.loadFormData();
    }

    loadFormData(): void {

    if (this.data.category) {
        this.id.set(this.data.category.id);
        this.name.set(this.data.category.name);
    } else {
        this.id.set(null);
        this.name.set(null);
    }
}

    onSave() {
        const id = this.id();
        const name = this.name();

        if(!name) {
            return;
        }

        const category = { id: this.id(), name: this.name() } as Category;
        this.categoryService.saveCategory(category).subscribe(() => {
            this.dialogRef.close(true);
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
