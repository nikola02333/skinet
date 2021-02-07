using System.Runtime.Serialization;

namespace Core.Entities.orderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,

        [EnumMember(Value = "PaymentRecived")]
        PaymentRecived,

        [EnumMember(Value = "PaymentFailed")]
        PaymentFailed
    }
}