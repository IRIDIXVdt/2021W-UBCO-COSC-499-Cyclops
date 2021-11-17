import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class SolutionPageForm{

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
        this.form = this.createForm();

    }
    private createForm() : FormGroup{
        return this.formBuilder.group({
            task: ['', [Validators.required]],
            score: ['', [Validators.required, Validators.minLength(2) ]]

        });
    }

    getForm() : FormGroup{
        return this.form;
    }
    

}