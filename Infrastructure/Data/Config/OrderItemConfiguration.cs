using Core.Entities.orderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Config
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<OrderItem> builder)
        {
            builder.OwnsOne( i => i.ItemOrderd, io =>  {io.WithOwner();});

            builder.Property( i => i.Price)
                    .HasColumnType("decimal(18,2)");
        }
    }
}