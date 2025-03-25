import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Challenge } from "./schemas/challenges.schema";
import { CreateChallengeDto } from "./dto/create-challenge.dto";
import { UpdateChallengeDto } from "./dto/update-challenge.dto";

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(Challenge.name) private readonly challengeModel: Model<Challenge>, // @InjectModel(Challenge.name) -> Zugriff auf die challenges-collection
  ) {}

  async getAllChallenges(): Promise<Challenge[]> {
    return this.challengeModel.find().exec(); // find() holt alle Einträge aus der DB
  }

  async getChallengeById(id: string): Promise<Challenge> {
    const challenge = await this.challengeModel.findById(id).exec(); // findById(id) sucht nach einer ID
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    return challenge;
  }

  async createChallenge(createChallengeDto: CreateChallengeDto, managerId: string): Promise<Challenge> {
    const newChallenge = new this.challengeModel({
        ...createChallengeDto,
        manager: managerId, // Manager-ID wird aus dem Token übernommen
    });
    return newChallenge.save();
}


async updateChallenge(id: string, updateData: UpdateChallengeDto, userId: string): Promise<Challenge> {
  const updatedChallenge = await this.challengeModel
    .findOneAndUpdate(
      { _id: id, manager: userId }, // Stelle sicher, dass der Manager der Ersteller ist!
      updateData,
      { new: true, runValidators: true }
    )
    .exec();

  if (!updatedChallenge) {
    throw new NotFoundException(`Challenge not found or unauthorized`);
  }
  return updatedChallenge;
}


  async deleteChallenge(id: string): Promise<{ message: string }> {
    const deletedChallenge = await this.challengeModel.findByIdAndDelete(id).exec();
    if (!deletedChallenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    return { message: `Challenge with ID ${id} deleted` };
  }
}
