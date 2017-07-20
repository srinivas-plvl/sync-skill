import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "skillFilter"
})


export class SkillFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.skill_name.indexOf(query) > -1);
        }
        return array;
    }
}