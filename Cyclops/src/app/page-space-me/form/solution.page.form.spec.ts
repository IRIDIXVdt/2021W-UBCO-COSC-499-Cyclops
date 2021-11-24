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
        expect(form.get('feedback').valid).toBeFalsy();
    })

})