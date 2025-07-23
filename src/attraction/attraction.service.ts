import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attraction } from './entities/attraction.entity';
import { CreateAttractionDto } from './dto/create-attraction.dto';
import { UpdateAttractionDto } from './dto/update-attraction.dto';

@Injectable()
export class AttractionService {
  constructor(
    @InjectRepository(Attraction)
    private attractionRepository: Repository<Attraction>,
  ) {}
  async create(createAttractionDto: CreateAttractionDto) {
    const attraction =
      await this.attractionRepository.create(createAttractionDto); //createAttractionDto ตัวที่เราส่งมา
    const toCreate = await this.attractionRepository.insert(attraction); //insert ข้อมูลที่เราสร้าง
    return toCreate;
  }

  findAll() {
    return this.attractionRepository.find(); //ดึงข้อมูลทั้งหมด
  }

  findOne(id: number) {
    return this.attractionRepository.findOneBy({ id }); //ดึงข้อมูลตาม id
  }

  async update(id: number, updateAttractionDto: UpdateAttractionDto) {
    let attraction = await this.attractionRepository.findOneBy({ id: id }); //ค้นหาข้อมูลตาม id
    if (!attraction) {
      throw new Error('Attraction not found'); //ถ้าไม่พบข้อมูลตาม id
    }
    //อัพเดทข้อมูล
    attraction = { ...attraction, ...updateAttractionDto }; //รวมข้อมูลที่มีและข้อมูลที่อัพเดท
    const toUpdate = await this.attractionRepository.save(attraction); //บันทึกข้อมูลที่อัพเดท
    return toUpdate
  }

  async remove(id: number) {
    const toDelete = await this.attractionRepository.delete({ id });
    return toDelete;
  }
}
