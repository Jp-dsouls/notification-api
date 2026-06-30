import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@ApiTags('channels')
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new channel' })
  @ApiResponse({ status: 201, description: 'Channel created successfully' })
  @ApiResponse({ status: 409, description: 'Channel name already exists' })
  create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelsService.create(createChannelDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all channels' })
  @ApiResponse({ status: 200, description: 'List of channels' })
  findAll() {
    return this.channelsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get channel by ID' })
  @ApiParam({ name: 'id', description: 'Channel UUID' })
  @ApiResponse({ status: 200, description: 'Channel found' })
  @ApiResponse({ status: 404, description: 'Channel not found' })
  findOne(@Param('id') id: string) {
    return this.channelsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update channel configuration' })
  @ApiParam({ name: 'id', description: 'Channel UUID' })
  @ApiResponse({ status: 200, description: 'Channel updated' })
  @ApiResponse({ status: 404, description: 'Channel not found' })
  update(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto,
  ) {
    return this.channelsService.update(id, updateChannelDto);
  }
}
