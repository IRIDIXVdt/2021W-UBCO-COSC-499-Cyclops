import { FormBuilder, FormGroup } from "@angular/forms";
import { SolutionPageForm } from "./solution.page.form"

describe('SolutionPageForm', ()=>{

    let solutionPageForm: SolutionPageForm;
    let form: FormGroup;

    beforeEach(()=> {
        solutionPageForm = new SolutionPageForm( new FormBuilder());
        form = solutionPageForm.getForm();

    })
    it('should solution be invalid', ()=> {
        expect(form.get('task').valid).toBeFalsy();
    })
    it('should score be invalid', ()=> {
        expect(form.get('score').valid).toBeFalsy();
    })
    it('should score be less than 3 invalid', ()=> {
        form.get('score').setValue('12');
        expect(form.get('score').valid).toBeFalsy();
    })
    it('should form be valid', ()=>{
        form.get('task').setValue('anyTask');
        form.get('score').setValue('anyScore');
        expect(form.valid).toBeTruthy();
    })

})