export class JobModel {
    job_Id: number;
    title?: String;
    description?: String;
    location?: String;
    creat_at?: Date;
    status?: String;
    minSalary?: number;
    maxSalary?: number;

    constructor(
        job_Id: number,
        title?: String,
        description?: String,
        location?: String,
        creat_at?: Date,
        status?: String,
        minSalary?: number,
        maxSalary?: number
    ){
        this.job_Id = job_Id;
        this.title  = title;
        this.description = description;
        this.location = location;
        this.creat_at = creat_at;
        this.status = status;
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
    }
}