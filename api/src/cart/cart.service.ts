import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { FilterCartDto } from './dto/filter-cart.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  async create(createCartDto: CreateCartDto) {
    // return await this.prisma.user.create({
    //   data: {
    //     cart: {
    //       create: {
    //         items: {},
    //       },
    //     },
    //   },
    // });
  }

  async findAll(query: FilterCartDto) {
    const { userId = 0, isSelect } = query;
    let user: User;

    try {
      if (userId === 0) {
        user = await this.prisma.user.create({
          data: {
            cart: {
              create: {
                items: {},
              },
            },
          },
        });
      } else {
        const foundUser = await this.prisma.user.findUnique({
          where: { id: userId },
        });

        if (!foundUser) {
          user = await this.prisma.user.create({
            data: {
              id: userId,
              cart: {
                create: {
                  items: {},
                },
              },
            },
          });
        } else {
          user = foundUser;
        }
      }

      return await this.prisma.cart.findUnique({
        where: {
          userId: user.id,
        },
        include: {
          items: {
            where: {
              isSelect: isSelect,
            },
            include: {
              product: {
                include: {
                  images: true,
                  promotionProducts: {
                    include: {
                      promotion: true,
                    },
                  },
                  giftProducts: {
                    include: {
                      gift: {
                        include: {
                          images: true,
                        },
                      },
                    },
                  },

                  colors: true,
                  sizes: true,
                },
              },
            },
          },
        },
      });
    } catch (err) {
      console.log('ERR', err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const { userId, items } = updateCartDto;
    try {
      return await this.prisma.cart.update({
        where: {
          id: id,
          userId: userId,
        },
        data: {
          items: {
            deleteMany: {},
            createMany: {
              data: (items ?? []).map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                isSelect: item.isSelect,
              })),
            },
          },
        },
        include: {
          items: true,
        },
      });
    } catch (err) {
      console.log('ERROR UPDATE', err);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
